# GLantern

GLantern is a graphics library based on WebGL, providing a subset of
[Flash](http://www.adobe.com/software/flash/about/)-like API. Sound support will be added in the
future.

Screenshots of test cases can be found in [here](res/images).

## Acquiring the Source

The repository is on [GitHub](http://github.com/Hozuki/GLantern/). You may want to use fine-tuned
[GitHub Desktop](//desktop.github.com/) (for Windows and Mac users), or `git` (for every OS) to
clone it into your computer:

```bash
$ git clone https://github.com/Hozuki/GLantern.git /preferred/cloning/destination
```

You may install it as a NPM package as an alternative:

```bash
$ npm install glantern --save
```

## Building from the Source

Make sure you have Node.js and NPM installed. The rest is quite simple:

```bash
$ cd /path/to/GLantern/
$ npm install
$ gulp build
```

After building, you will find:

- a `build/node` directory for NW.js and Electron (`var GLantern = require("glantern");`);
- a `build/GLantern-browser.js` file as the full, concatenated JavaScript file that can be placed
in browsers using the `<script>` tag;
- a `build/GLantern-browser.min.js` (and corresponding source mapping) as the minimized file for
better loading speed.

## Using the Library

See the demo page at `test/visual/index.html`. You will need an environment with WebGL, like
modern browsers, [NW.js](http://nwjs.io/), or [Electron](http://electron.atom.io/).

### Importing into Your Project

GLantern supports two styles of importing.

The first one is importing by `<script>` tag. Use its `src` attribute and point it to `GLantern-browser.min.js`
in the `build` directory:

```html
<script type="text/javascript" src="build/GLantern-browser.min.js"></script>
```

In environments that support Node.js, like NW.js or Electron, you can also use the `require` syntax:

```html
<script type="text/javascript">
    var GLantern = require("glantern");
</script>
```

After importing with either the former or the latter style, the `GLantern` object is globally available.

### Using Exported Members

The package structure of Flash is preserved in GLantern, so adding a `GLantern.` prefix usually
works. If you want to make it more like ActionScript, GLantern provides a `injectToGlobal()` function
to inject the "packages" to the global scope.

Either the first or the second style is accepted:

**Common code, used in both Style #1 and Style #2**

```javascript
var lantern = new GLantern.GLantern();
lantern.initialize(682, 438);
document.body.appendChild(lantern.view);
window.addEventListener("unload", function () {
    lantern.uninitialize();
});
```

**Style #1**

```javascript
var Display = Object.create({
    "createShape": function (alpha) {
        var s = new GLantern.flash.display.Shape(lantern.stage, lantern.stage);
        lantern.stage.addChild(s);
        s.alpha = alpha;
        return s;
    }
});
g = Display.createShape(1);
g.graphics.beginFill(0xffffff);
g.graphics.drawRect(0, 0, 540, 383);
g.graphics.endFill();
```

**Style #2**

```javascript
GLantern.injectToGlobal(this);
// And now GLantern members ("packages") are injected to the global scope.
var Display = Object.create({
    "createShape": function (alpha) {
        var s = new flash.display.Shape(lantern.stage, lantern.stage);
        lantern.stage.addChild(s);
        s.alpha = alpha;
        return s;
    }
});
g = Display.createShape(1);
g.graphics.beginFill(0xffffff);
g.graphics.drawRect(0, 0, 540, 383);
g.graphics.endFill();
```

## API References

<del>See [Wiki](//github.com/Hozuki/GLantern/wiki/).</del> (Not written yet.)

Visit the [ActionScript 3 API Reference](http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/) instead.

## License

[The MIT License](//mitlicense.org)

You will also find a copy at [`LICENSE.md`](LICENSE.md).

## Other Resources

- Adobe Flash CC is able to export Flash project as WebGL projects. The tutorial and
restrictions can be found [here](https://helpx.adobe.com/flash/using/creating-publishing-webgl-document.html).
However, it has recently be announced that [Flash is replaced by Animate](http://blogs.adobe.com/flashpro/welcome-adobe-animate-cc-a-new-era-for-flash-professional/).
So fellas, you may want to give a warm welcome to that new solution.
- Mozilla has started a project, [Shumway](https://wiki.mozilla.org/Shumway), which is intended to
provide Flash-like support by using HTML 5 features on Firefox.
