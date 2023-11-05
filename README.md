# Red Riding Hood

By: Stella Marie

Red Riding Hood game format variations with custom physics and rendering

## Description

This project is a personal learning exercise.

1.  Story in Game formats
2.  Physics
3.  Rendering

Include:
Game formats - refer to Game Formats list
Rendering - canvas, webgl, webgpu | with/out web workers
PWA 

###

Initialize rendering
- set mode: [webgpu, webgl, 2d]
- get context
- set workerEnabled
- set localStorage
- set cloudStorage

**Web Workers**
```js
workerEnabled = Boolean(window.Worker)
if (window.Worker)
    const worker = new Worker('worker.js')
    worker.postMessage(data)
    worker.onmessage = (e) => {
        console.log(e.data)
    }
```

```js
onmessage = (e) => {
    console.log(e)
    e.data.forEach(datum => console.log(datum))
    const result = doSth(e.data)
    postMessage(result)
}
```

## Game Formats list
- Graphic adventure | side-view
- Typed adventure
- Fashion
- Match3

**Options**
- First person shooter
- Third person shooter
- Beat 'em up
- Stealth
- Survival
- Surival horror
- Rhythm
- Puzzle-platform
- Sidescroller
- Metroidvania
- Shooter
- Stealth
- Roguelike
- Visual novel
- Interactive movie
- Physics
- Programming
- Exploration
- Hidden object
- Reveal picture
- Tile-matching
- Card game

**Out of Scope**
- Battle Royale
- Real-time 3D Adventures

## Resources

- Build a simple 2d physics engine for javascript: [2012](https://developer.ibm.com/tutorials/wa-build2dphysicsengine/)
- How to create a custom 2D physicc engine: [2013](https://code.tutsplus.com/how-to-create-a-custom-2d-physics-engine-the-basics-and-impulse-resolution--gamedev-6331t)

**Planck.js**
Type: 2D physics engine
Links: [Planck.js](https://piqnt.com/planck.js) [piqnt/planck.js](https://github.com/piqnt/planck.js)

**Matter.js**
Type: 2D physics engine
Links: [Matter.js](https://brm.io/matter-js/) [liabru/matter-js](https://github.com/liabru/matter-js)

**Toxiclibs.js**
Type: Soft body physics engine
Links: [Toxiclibs.js](http://haptic-data.com/toxiclibsjs) [hapticdata/toxiclibsjs](https://github.com/hapticdata/toxiclibsjs)

## Known Bugs
_Status_: in-development

## License

[MIT](https://choosealicense.com/licenses/mit/)
[License](./LICENSE)

Copyright © 2023 Sm Kou