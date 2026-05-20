"use client";

import { useEffect, useRef } from "react";

// Matrix-rain shader from the Stitch "Architectural Precision" mockup.
// Subtle vertical streaks of light over a deep corporate blue, with a vignette.
const VERT = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform float time;
uniform vec2 resolution;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec2 p = uv * vec2(resolution.x / resolution.y, 1.0);

  float color = 0.0;
  vec2 grid = floor(p * 25.0);
  float h = hash(grid);

  if (h > 0.95) {
    float speed = 0.5 + h * 0.5;
    float offset = fract(time * speed + h * 10.0);
    float line = smoothstep(0.9, 1.0, 1.0 - abs(fract(p.y * 10.0 + offset) - 0.5) * 2.0);
    color = line * h;
  }

  vec3 bg = vec3(0.118, 0.251, 0.686); // #1E40AF
  vec3 highlight = vec3(0.384, 0.561, 1.0);

  vec3 finalColor = mix(bg * 0.2, highlight, color * 0.4);
  finalColor *= 1.0 - length(uv - 0.5) * 0.5; // vignette

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

export default function ShaderBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return; // No WebGL → the section's dark fallback background stays.

    const compile = (type: number, src: string): WebGLShader | null => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const posLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, "time");
    const resLoc = gl.getUniformLocation(program, "resolution");

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(resLoc, w, h);
    };

    const draw = (seconds: number) => {
      resize();
      gl.uniform1f(timeLoc, seconds);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();

    let rafId = 0;
    let running = false;

    const loop = (now: number) => {
      if (!running) return;
      draw((now - start) / 1000);
      rafId = requestAnimationFrame(loop);
    };
    const startLoop = () => {
      if (running || reduce) return;
      running = true;
      rafId = requestAnimationFrame(loop);
    };
    const stopLoop = () => {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    };

    if (reduce) {
      draw(0); // single static frame
    } else {
      startLoop();
    }

    // Pause the loop while the section is scrolled out of view.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startLoop();
        else stopLoop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      stopLoop();
      io.disconnect();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`absolute inset-0 h-full w-full pointer-events-none ${className}`}
    />
  );
}
