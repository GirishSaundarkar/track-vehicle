const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const apiRoutes = require("./routes/api");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use("/api", apiRoutes);

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    const interval = setInterval(() => {
        socket.emit("vehicle-location", { id: socket.id });
    }, 2000);

    socket.on("disconnect", () => {
        clearInterval(interval);
        console.log("Client disconnected:", socket.id);
    });
});

// Render the frontend
app.get("/", (req, res) => {
    res.render("index");
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
