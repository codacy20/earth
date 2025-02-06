# Earth: Interactive Solar System Simulation

This project is an interactive solar system simulation built with [Next.js](https://nextjs.org) and [D3.js](https://d3js.org). It renders a sun at the center of the screen with eight planets orbiting it along elliptical paths. The simulation includes interactive features—hovering over a planet pauses its orbit and displays its name, and Mercury/Venus dynamically adjust their z-order to simulate realistic depth.

## Features

- **Responsive Design:** The simulation scales to fit the width of your screen.
- **Dynamic Animation:** Planets orbit continuously, and hovering over a planet stops its motion and displays a label.
- **Realistic Depth:** Mercury and Venus change their z-order based on their y-position relative to the sun.
- **Next.js & D3.js:** Leverages Next.js for a modern React framework experience and D3.js for powerful SVG rendering and animations.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or above recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/earth.git
   cd earth
   ```

2. **Install Dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

### Running the Application

Start the development server:

Using npm:

```bash
npm run dev
```

Or using Yarn:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the solar system simulation in action.
look and feel.

## Deployment

To build the application for production, run:

Using npm:

```bash
npm run build
```

Or using Yarn:

```bash
yarn build
```

You can then deploy the production build to your favorite hosting service (e.g., Vercel, Netlify, etc.).

## Learn More

- **Next.js Documentation:** Learn about Next.js features and deployment.
- **D3.js Documentation:** Explore D3.js for advanced data visualization.
- **Vercel Deployment:** Guide to deploying Next.js applications on Vercel.

## License

This project is licensed under the MIT License.

## Contact

For any questions or suggestions, please open an issue in the repository or contact via email.

Happy orbiting!
