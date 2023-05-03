/* SOUNDS COLLECTION */

function SyncSounds() {

  client.sounds = new Array;
  // client.sounds = new Collection()

  const soundsPath = path.join(__dirname, "sounds");
  const soundsFiles = fs.readdirSync(soundsPath).filter((file) => file.endsWith(".mp3"));

  for (const file of soundsFiles) {
    client.sounds.push(path.parse(file).name)
    // client.sounds.push(path.parse(file).name, file)
  }

}
