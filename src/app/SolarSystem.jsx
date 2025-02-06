'use client';

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const SolarSystem = () => {
  // Set the dimensions of the SVG canvas.
  const width = 800;
  const height = 600;
  const centerX = width / 2;
  const centerY = height / 2;

  // Reference to the SVG element.
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Create groups so we can control layering.
    const orbitGroup = svg.append('g').attr('class', 'orbits');
    const objectsGroup = svg.append('g').attr('class', 'objects');

    // Define an array of planets with their properties.
    const planets = [
      { name: 'Mercury', color: 'gray', r: 4, orbitRadiusX: 60, orbitRadiusY: 20, speed: 0.04 },
      { name: 'Venus', color: 'orange', r: 7, orbitRadiusX: 90, orbitRadiusY: 30, speed: 0.03 },
      { name: 'Earth', color: 'blue', r: 8, orbitRadiusX: 120, orbitRadiusY: 40, speed: 0.02 },
      { name: 'Mars', color: 'red', r: 6, orbitRadiusX: 150, orbitRadiusY: 50, speed: 0.015 },
      { name: 'Jupiter', color: 'brown', r: 12, orbitRadiusX: 200, orbitRadiusY: 70, speed: 0.01 },
      { name: 'Saturn', color: 'goldenrod', r: 10, orbitRadiusX: 250, orbitRadiusY: 90, speed: 0.008 },
      { name: 'Uranus', color: 'lightblue', r: 9, orbitRadiusX: 300, orbitRadiusY: 100, speed: 0.007 },
      { name: 'Neptune', color: 'blue', r: 9, orbitRadiusX: 350, orbitRadiusY: 110, speed: 0.006 },
    ];

    // Draw orbits in the orbitGroup so they are always at the back.
    planets.forEach((planet) => {
      orbitGroup
        .append('ellipse')
        .attr('class', `orbit ${planet.name}`)
        .attr('cx', centerX)
        .attr('cy', centerY)
        .attr('rx', planet.orbitRadiusX)
        .attr('ry', planet.orbitRadiusY)
        .attr('fill', 'none')
        .attr('stroke', 'gray')
        .attr('stroke-dasharray', '4 2');
    });

    // Draw the sun in the objectsGroup.
    const sun = objectsGroup
      .append('circle')
      .attr('class', 'sun')
      .attr('cx', centerX)
      .attr('cy', centerY)
      .attr('r', 30)
      .attr('fill', 'yellow')
      .attr('opacity', 0.8);

    // Create a dictionary to store each planet’s circle.
    const planetCircles = {};
    planets.forEach((planet) => {
      planetCircles[planet.name] = objectsGroup
        .append('circle')
        .attr('class', `planet ${planet.name}`)
        .attr('r', planet.r)
        .attr('fill', planet.color);
    });

    // Initialize each planet’s starting angle.
    const planetAngles = {};
    planets.forEach((planet) => {
      planetAngles[planet.name] = Math.random() * 2 * Math.PI;
    });

    // Animate the planets.
    d3.timer(() => {
      planets.forEach((planet) => {
        // Update the angle.
        planetAngles[planet.name] = (planetAngles[planet.name] + planet.speed) % (2 * Math.PI);
        // Calculate the planet's position along its elliptical orbit.
        const x = centerX + planet.orbitRadiusX * Math.cos(planetAngles[planet.name]);
        const y = centerY + planet.orbitRadiusY * Math.sin(planetAngles[planet.name]);
        // Update the planet's position.
        planetCircles[planet.name].attr('cx', x).attr('cy', y);

        // For Mercury and Venus, adjust their z-order relative to the sun.
        // When the planet's y is less than centerY, it's behind the sun.
        if (planet.name === 'Mercury' || planet.name === 'Venus') {
          if (y < centerY) {
            // Insert the element before the sun in the DOM so it appears behind.
            planetCircles[planet.name].each(function () {
              this.parentNode.insertBefore(this, sun.node());
            });
          } else {
            // Append the element after the sun so it appears in front.
            planetCircles[planet.name].each(function () {
              this.parentNode.insertBefore(this, null);
            });
          }
        }
      });
    });
  }, [centerX, centerY]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default SolarSystem;
