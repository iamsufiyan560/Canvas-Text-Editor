# Canvas Text Editor






https://github.com/user-attachments/assets/c1ec99c3-c61f-4859-b2f8-d23400c142fb


## Project Description

Canvas Text Editor is a React-based web application that allows users to add and manipulate text on a canvas. It provides a simple and intuitive interface for creating and styling text elements, making it ideal for quick graphic design tasks or prototype creation.

## Features

- Add text elements to a canvas
- Choose from a wide variety of fonts
- Adjust font size
- Apply text styles (bold, italic, underline)
- Undo and redo actions
- Responsive design for both desktop and mobile use

## Code Overview

The application is built using React and leverages the Fabric.js library for canvas manipulation. Here's a brief overview of the main components:

- `App.js`: The main component that renders the canvas and controls.
- `fabric.js`: Used to create and manipulate the canvas and text objects.
- `react-select`: Implements the font selection dropdown.
- `lucide-react`: Provides icons for the user interface.

Key features of the code:

1. **Canvas Initialization**: The canvas is created and sized responsively based on the window size.
2. **Text Addition**: Users can add new text elements to the canvas with random positioning.
3. **Text Styling**: The app allows for font family changes, size adjustments, and style toggles (bold, italic, underline).
4. **Undo/Redo Functionality**: Implements undo and redo stacks to manage user actions.
5. **Responsive Design**: The layout adjusts for different screen sizes, ensuring usability on both desktop and mobile devices.

## How to Run the Project

Follow these steps to run the Canvas Text Editor on your local machine:

1. Ensure you have [Node.js](https://nodejs.org/) installed on your system.

2. Clone the repository to your local machine:

   ```
   git clone https://github.com/yourusername/canvas-text-editor.git
   ```

3. Navigate to the project directory:

   ```
   cd canvas-text-editor
   ```

4. Install the required dependencies:

   ```
   npm install
   ```

5. Start the development server:

   ```
   npm run dev
   ```

6. Open your web browser and visit `http://localhost:3000` (or the port specified in your terminal) to view and interact with the Canvas Text Editor.

## Dependencies

- React
- Fabric.js
- react-select
- lucide-react

## Contributing

We welcome contributions to the Canvas Text Editor project. Please feel free to submit issues, fork the repository and send pull requests!

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
