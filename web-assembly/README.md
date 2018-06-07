WebAssembly

WebAssembly 是除了 JavaScript 以外，另一种可以在浏览器中执行的编程语言。所以当人们说 WebAssembly 更快的时候，一般来讲是与 JavaScript 相比而言的。

目前比较流行编写WebAssembly是通过编写C/C++ 或者 编写asm.js 规范的Javascript，并通过转换工具将其转化为.wasm来实现的。

参考：https://segmentfault.com/a/1190000008402872

安装编译工具

- Emscripten
- Binaryen
- WABT (WebAssembly Binary Toolkit)

快速体验 WebAssembly

粘贴以下代码到控制台

    WebAssembly.compile(new Uint8Array(`
      00 61 73 6d  01 00 00 00  01 0c 02 60  02 7f 7f 01
      7f 60 01 7f  01 7f 03 03  02 00 01 07  10 02 03 61
      64 64 00 00  06 73 71 75  61 72 65 00  01 0a 13 02
      08 00 20 00  20 01 6a 0f  0b 08 00 20  00 20 00 6c
      0f 0b`.trim().split(/[\s\r\n]+/g).map(str => parseInt(str, 16))
    )).then(module => {
      const instance = new WebAssembly.Instance(module)
      const { add, square } = instance.exports
    
      console.log('2 + 4 =', add(2, 4))
      console.log('3^2 =', square(3))
      console.log('(2 + 5)^2 =', square(add(2 + 5)))
    })

把 C/C++ 编译成 WebAssembly

关键的工具是 Emscripten，它基于 LLVM ，可以将 C/C++ 编译成 asm.js，使用 WASM 标志也可以直接生成 WebAssembly 二进制文件（后缀是 .wasm）。

    Emscripten
    source.c   ----->  target.js（asm规范）
    
    Emscripten (with flag)
    source.c   ----->  target.wasm

把满足asm.js规范的Javascript 编译成 WebAssembly

编写asm规范的js：

    // math.js
    function () {
      "use asm";
      function square (x) {
        x = x | 0;
        return x * x | 0;
      }
      return {
        square: square
      };
    }

想要把 asm.js 编译成 WebAssembly，就要用到他们官方提供的 Binaryen 和 WABT (WebAssembly Binary Toolkit) 工具了。

原理类似：

            Binaryen             WABT
    math.js   --->   math.wast   --->   math.wasm

如何运行 WebAssembly 二进制文件？

用 javascript ！

    function loadWebAssembly (path) {
      return fetch(path)                   // 加载文件        
        .then(res => res.arrayBuffer())    // 转成 ArrayBuffer
        .then(WebAssembly.instantiate)     // 编译 + 实例化
        .then(mod => mod.instance)         // 提取生成模块
    }
    
    loadWebAssembly('path/to/math.wasm')
      .then(instance => {
        const { add, square } = instance.exports
        // ...
      })


