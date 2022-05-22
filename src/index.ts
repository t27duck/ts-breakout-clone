import { CanvasView } from "./view/CanvasView";
import { Game } from "./Game";

// Create a new view
const view = new CanvasView("#playField");
const game = new Game(view);
