const express = require("express");
const ytdl = require("@distube/ytdl-core");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/download", async (req, res) => {
  const videoURL = req.query.url;

  if (!ytdl.validateURL(videoURL)) {
    return res.status(400).send("Invalid YouTube URL");
  }

  try {
    const info = await ytdl.getInfo(videoURL);
    const title = info.videoDetails.title.replace(/[^\w\s]/gi, "");

    res.header("Content-Disposition", `attachment; filename="${title}.mp4"`);

    ytdl(videoURL, {
      format: "mp4"
    }).pipe(res);
  } catch (err) {
    console.error("Download error:", err.message);
    res.status(500).send("Failed to download video");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
