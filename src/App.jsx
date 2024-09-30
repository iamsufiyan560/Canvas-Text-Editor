import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import {
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Plus,
  Minus,
} from "lucide-react";
import Select from "react-select";
const fontOptions = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Georgia",
  "Courier New",
  "Verdana",
  "Trebuchet MS",
  "Comic Sans MS",
  "Impact",
  "Lucida Console",
  "Palatino Linotype",
  "Garamond",
  "Century Gothic",
  "Arial Black",
  "Frank Ruhl Libre",
  "Droid Sans",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Source Sans Pro",
  "Merriweather",
  "Ubuntu",
  "Raleway",
  "PT Serif",
  "Nunito",
  "Fira Sans",
  "Poppins",
  "Playfair Display",
  "Cabin",
  "Work Sans",
  "Quicksand",
  "Oswald",
  "Bebas Neue",
  "Anton",
  "Josefin Sans",
  "Inconsolata",
  "Zilla Slab",
  "Manrope",
  "Barlow",
  "Tinos",
  "Arvo",
  "Karla",
  "Mukta",
  "Asap",
  "Teko",
  "Dosis",
  "Crimson Text",
  "Lora",
  "Bitter",
  "Abril Fatface",
  "Saira",
  "Rokkitt",
  "Oxygen",
  "Yanone Kaffeesatz",
  "Overpass",
  "Rubik",
  "Libre Baskerville",
  "Spectral",
  "Cairo",
  "Vollkorn",
  "Catamaran",
].map((font) => ({ value: font, label: font }));

const App = () => {
  const [canvas, setCanvas] = useState(null);
  const [font, setFont] = useState("Arial");
  const [fontSize, setFontSize] = useState(20);
  const [selectedTextId, setSelectedTextId] = useState(null);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const updateCanvasDimensions = () => {
      if (!canvas) return;

      const canvasWidth = window.innerWidth < 768 ? 250 : 400;
      const canvasHeight = window.innerWidth < 768 ? 250 : 400;

      if (canvas.lowerCanvasEl) {
        canvas.setWidth(canvasWidth);
        canvas.setHeight(canvasHeight);
        canvas.renderAll();
      }
    };

    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: window.innerWidth < 768 ? 250 : 400,
      height: window.innerWidth < 768 ? 250 : 400,
      backgroundColor: "white",
    });
    setCanvas(newCanvas);

    window.addEventListener("resize", updateCanvasDimensions);

    updateCanvasDimensions();

    return () => {
      window.removeEventListener("resize", updateCanvasDimensions);
      newCanvas.dispose();
    };
  }, []);

  const addText = () => {
    if (canvas) {
      const textId = Date.now();

      //generate random number so for every new text will be show on another place
      const randomLeft = Math.floor(Math.random() * (canvas.width - 100));
      const randomTop = Math.floor(Math.random() * (canvas.height - 50));

      const text = new fabric.IText("New Text", {
        left: randomLeft,
        top: randomTop,
        fontFamily: font,
        fontSize: fontSize,
        fill: "black",
        id: textId,
      });
      canvas.add(text);
      setSelectedTextId(textId);
      canvas.setActiveObject(text);
      canvas.renderAll();
      updateUndoStack({ type: "add", id: textId });
    }
  };

  const updateTextStyle = (style, value) => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === "i-text") {
      const previousValue = activeObject.get(style);
      activeObject.set(style, value);
      canvas.renderAll();
      updateUndoStack({
        type: "style",
        id: activeObject.id,
        style,
        previousValue,
      });
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const lastAction = redoStack.pop();
      undoStack.push(lastAction);

      if (lastAction.type === "add") {
        const obj = canvas.getObjects().find((o) => o.id === lastAction.id);
        if (obj) {
          canvas.add(obj);
        }
      } else if (lastAction.type === "style") {
        const { id, style, previousValue } = lastAction;
        const obj = canvas.getObjects().find((o) => o.id === id);
        if (obj) {
          obj.set(style, previousValue);
        }
      }
      canvas.renderAll();
      setUndoStack([...undoStack]);
      setRedoStack([...redoStack]);
    }
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const lastAction = undoStack.pop();
      redoStack.push(lastAction);

      if (lastAction.type === "add") {
        const obj = canvas.getObjects().find((o) => o.id === lastAction.id);
        if (obj) {
          canvas.remove(obj);
        }
      } else if (lastAction.type === "style") {
        const { id, style, previousValue } = lastAction;
        const obj = canvas.getObjects().find((o) => o.id === id);
        if (obj) {
          obj.set(style, previousValue);
        }
      }
      canvas.renderAll();
      setUndoStack([...undoStack]);
      setRedoStack([...redoStack]);
    }
  };

  const updateUndoStack = (action) => {
    setUndoStack((prev) => [...prev, action]);
    setRedoStack([]);
  };

  const toggleStyle = (style, value) => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === "i-text") {
      const currentValue = activeObject.get(style);
      const newValue = currentValue === value ? "" : value;
      updateTextStyle(style, newValue);
    }
  };

  const handleFontSizeChange = (change) => {
    const newSize = fontSize + change;
    setFontSize(newSize);
    updateTextStyle("fontSize", newSize);
  };

  return (
    <div className="   flex md:flex-row flex-col ">
      <div className="w-80  ml-8 mt-8 flex  items-center">
        <p class="text-sm text-gray-700 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-md ">
          <strong>Note:</strong> Some fonts may appear similar or behave the
          same due to their design, so please don't assume there is an issue
          with the code. You may not notice a visible difference with every
          selection.
        </p>
      </div>

      <div className="flex flex-col items-center space-y-4 p-4">
        <div className="flex space-x-2">
          <button
            onClick={handleUndo}
            className="p-2 bg-gray-200 hover:bg-gray-400  rounded"
          >
            <Undo size={20} />
          </button>
          <button
            onClick={handleRedo}
            className="p-2 bg-gray-200  hover:bg-gray-400 rounded"
          >
            <Redo size={20} />
          </button>
        </div>
        <canvas ref={canvasRef} className="border border-gray-300" />
        <div className="flex md:flex-row flex-col gap-4 space-x-2">
          <button
            onClick={addText}
            className="px-4 py-2 w-36 h-12 bg-blue-500 text-white rounded"
          >
            Add Text
          </button>

          {/* // this code is same as below but problem i faced in this code is when
          dropwdon is open it show on top of canvas thatsy why i want to use
          liblary for select */}
          {/* <select
          value={font}
          onChange={(e) => {
            setFont(e.target.value);
            updateTextStyle("fontFamily", e.target.value);
          }}
          className="px-2 py-1 border rounded"
        >
          {fontOptions.map((fontOption) => (
            <option key={fontOption} value={fontOption}>
              {fontOption}
            </option>
          ))}
        </select> */}
          <Select
            className="w-60"
            options={fontOptions}
            onChange={(selectedOption) => {
              setFont(selectedOption.value);
              updateTextStyle("fontFamily", selectedOption.value);
            }}
            defaultValue={fontOptions[0]}
            menuPlacement="auto"
            styles={{
              control: (provided) => ({
                ...provided,
                height: 40,
              }),
              menu: (provided) => ({
                ...provided,
                marginTop: 0,
                maxHeight: 150,
                overflowY: "auto",
                overflowX: "hidden",
              }),
              option: (provided) => ({
                ...provided,
                height: 40,
              }),
              menuList: (provided) => ({
                ...provided,
                padding: 0,
                maxHeight: 150,
              }),
            }}
          />
          <div className="flex border w-fit rounded-md">
            <button onClick={() => handleFontSizeChange(-1)} className="p-2">
              <Minus size={20} />
            </button>
            <input
              type="number"
              value={fontSize}
              onChange={(e) => {
                const newSize = parseInt(e.target.value);
                setFontSize(newSize);
                updateTextStyle("fontSize", newSize);
              }}
              className="w-16 px-2 appearance-none py-1 border rounded "
            />
            <button onClick={() => handleFontSizeChange(1)} className="p-2">
              <Plus size={20} />
            </button>
          </div>
          <div className="flex md:gap-2 gap-8">
            <button
              onClick={() => toggleStyle("fontWeight", "bold")}
              className={`p-2 rounded ${
                selectedTextId &&
                canvas.getActiveObject()?.get("fontWeight") === "bold"
                  ? "bg-sky-200"
                  : ""
              }`}
            >
              <Bold size={20} />
            </button>
            <button
              onClick={() => toggleStyle("fontStyle", "italic")}
              className={`p-2 rounded ${
                selectedTextId &&
                canvas.getActiveObject()?.get("fontStyle") === "italic"
                  ? "bg-sky-200"
                  : ""
              }`}
            >
              <Italic size={20} />
            </button>
            <button
              onClick={() => toggleStyle("underline", true)}
              className={`p-2 rounded ${
                selectedTextId && canvas.getActiveObject()?.get("underline")
                  ? "bg-sky-200"
                  : ""
              }`}
            >
              <Underline size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
