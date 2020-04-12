# Shar-Player
A minimal audio player written in Vanilla JS

<img src='https://raw.githubusercontent.com/sharadcodes/Shar-Player/master/screenshots/shar.png'/>

### How to use

```html
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Shar Player Example</title>
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="../../src/css/sharplayer.css" />
  </head>

  <body>

    <script src="../../src/js/sharplayer.js"></script>

    <script>
      window.onload = function () {
        const song_list = [
          "audio_files/Faded.mp3",
          "audio_files/on_and_on.mp3",
          "audio_files/Cartoon_Howling.mp3",
          "audio_files/bensound-anewbeginning.mp3",
        ];
        //   new object
        new SharPlayer("player", {
          tracks: song_list,
          titles: false, 
          artwork: false,
        })
          .initPlayer()
          .show();
      };
    </script>

  </body>

</html>
```
