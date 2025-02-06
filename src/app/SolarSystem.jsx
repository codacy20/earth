'use client';

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const SolarSystem = () => {
  // Define the coordinate system dimensions.
  const viewWidth = 800;
  const viewHeight = 600;
  const centerX = viewWidth / 2;
  const centerY = viewHeight / 2;

  // Reference to the SVG element.
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Create layering groups.
    const orbitGroup = svg.append('g').attr('class', 'orbits');
    const objectsGroup = svg.append('g').attr('class', 'objects');

    // Define planets along with their properties.
    const planets = [
      { name: 'Mercury', color: 'gray', r: 4, orbitRadiusX: 60, orbitRadiusY: 20, speed: 0.004 },
      { name: 'Venus', color: 'orange', r: 7, orbitRadiusX: 90, orbitRadiusY: 30, speed: 0.004 },
      { name: 'Earth', color: 'blue', r: 8, orbitRadiusX: 120, orbitRadiusY: 40, speed: 0.004 },
      { name: 'Mars', color: 'red', r: 6, orbitRadiusX: 150, orbitRadiusY: 50, speed: 0.004 },
      { name: 'Jupiter', color: 'brown', r: 12, orbitRadiusX: 200, orbitRadiusY: 70, speed: 0.004 },
      { name: 'Saturn', color: 'goldenrod', r: 10, orbitRadiusX: 250, orbitRadiusY: 90, speed: 0.004 },
      { name: 'Uranus', color: 'lightblue', r: 9, orbitRadiusX: 300, orbitRadiusY: 100, speed: 0.004 },
      { name: 'Neptune', color: 'blue', r: 9, orbitRadiusX: 350, orbitRadiusY: 110, speed: 0.004 },
    ];

    // Use data-join to draw orbit ellipses.
    orbitGroup
      .selectAll('ellipse')
      .data(planets)
      .enter()
      .append('ellipse')
      .attr('class', (d) => `orbit ${d.name}`)
      .attr('cx', centerX)
      .attr('cy', centerY)
      .attr('rx', (d) => d.orbitRadiusX)
      .attr('ry', (d) => d.orbitRadiusY)
      .attr('fill', 'none')
      .attr('stroke', 'gray')
      .attr('stroke-dasharray', '4 2');

    // Draw the sun.
    const sun = objectsGroup
      .append('circle')
      .attr('class', 'sun')
      .attr('cx', centerX)
      .attr('cy', centerY)
      .attr('r', 30)
      .attr('fill', 'yellow')
      .attr('opacity', 0.8);

    // Initialize each planet's dynamic properties.
    planets.forEach((planet) => {
      planet.angle = Math.random() * 2 * Math.PI;
      planet.paused = false;
      // Draw the planet's circle.
      planet.circle = objectsGroup
        .append('circle')
        .attr('class', `planet ${planet.name}`)
        .attr('r', planet.r)
        .attr('fill', planet.color)
        // On hover, pause movement and display label.
        .on('mouseover', function () {
          planet.paused = true;
          if (!planet.label) {
            planet.label = objectsGroup
              .append('text')
              .attr('class', 'label')
              .text(planet.name)
              .attr('font-size', '12px')
              .attr('fill', 'white')
              .attr('text-anchor', 'middle')
              .attr('dy', -10);
          }
        })
        .on('mouseout', function () {
          planet.paused = false;
          if (planet.label) {
            planet.label.remove();
            planet.label = null;
          }
        });
    });

    // Animation loop.
    d3.timer(() => {
      planets.forEach((planet) => {
        if (!planet.paused) {
          planet.angle = (planet.angle + planet.speed) % (2 * Math.PI);
        }
        const x = centerX + planet.orbitRadiusX * Math.cos(planet.angle);
        const y = centerY + planet.orbitRadiusY * Math.sin(planet.angle);
        planet.circle.attr('cx', x).attr('cy', y);
        if (planet.label) {
          planet.label.attr('x', x).attr('y', y);
        }
        // For Mercury and Venus, adjust z-order based on y-position.
        if (planet.name === 'Mercury' || planet.name === 'Venus') {
          if (y < centerY) {
            // Appear behind the sun.
            planet.circle.each(function () {
              this.parentNode.insertBefore(this, sun.node());
            });
          } else {
            // Appear in front of the sun.
            planet.circle.each(function () {
              this.parentNode.insertBefore(this, null);
            });
          }
        }
      });
    });
  }, [centerX, centerY]);

  return <svg ref={svgRef} viewBox={`0 0 ${viewWidth} ${viewHeight}`} style={{ width: '100%', height: 'auto' }} />;
};

export default SolarSystem;
