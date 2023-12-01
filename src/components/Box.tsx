'use client'

import { CSSProperties, MouseEventHandler, useCallback, useContext, useEffect, useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'

export default function Box() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const angle = useMotionValue(0)
  const shadowX = useMotionValue(0)
  const shadowY = useMotionValue(0)

  const self = useRef<HTMLDivElement>(null)


  const handleBoxUpdate = useCallback<MouseEventHandler>(function handleBoxUpdate({ clientX: x, clientY: y }) {
    if (!self.current) return

    const { left, top, width, height } = self.current.getBoundingClientRect()

    // mouse position

    mouseX.set(x - left)
    mouseY.set(y - top)

    // angle

    const centerX = left + width / 2
    const centerY = top + height / 2

    const deltaX = x - centerX
    const deltaY = y - centerY

    const rad = Math.atan2(deltaY, deltaX)
    const angle_ = rad * 180 / Math.PI - 90

    angle.set(angle_)

    // shadow offset

    // const dx = Math.max(left - clientX, 0, clientX - right)
    // const dy = Math.max(top - clientY, 0, clientY - bottom)
    // const distance = Math.sqrt(dx ** 2 + dy ** 2)

    const offset = 4
    const horizontal = Math.cos(rad) * offset
    const vertical = Math.sin(rad) * offset

    shadowX.set(horizontal)
    shadowY.set(vertical)

  }, [angle, mouseX, mouseY, shadowX, shadowY])

  useEffect(() => {
    //@ts-ignore
    document.body.addEventListener('mousemove', handleBoxUpdate)
    //@ts-ignore
    return () => document.body.removeEventListener('mousemove', handleBoxUpdate)
  }, [handleBoxUpdate])

  return (
    <motion.div
      ref={self}
      id="Box"
      // onMouseMove={handleMouseMove}
      style={
        {
          '--light-color': 'rgba(255, 255, 205, 0.15)', // circle gradient
          '--background-color': '22 23 22', // flat color
          '--padding-color': '255 255 235', // circle gradient
          '--border-color': '235 255 235',  // linear gradient
          '--shadow-color': '255 255 235',  // circle shadow

          '--bg-content': 'linear-gradient(rgb(var(--background-color)), rgb(var(--background-color)))',
          '--bg-padding': useMotionTemplate`linear-gradient(${angle}deg,
              rgb(var(--padding-color)) 0%,
              rgb(var(--padding-color) / 0.3) 33.33%,
              rgb(var(--padding-color) / 0.14) 66.67%,
              transparent 80%
            )
          `,
          '--bg-border': useMotionTemplate`radial-gradient(
              70vw circle at ${mouseX}px ${mouseY}px,
              rgb(var(--border-color) / 1),
              transparent 50%
            )
          `,
          'box-shadow': useMotionTemplate`${shadowX}px ${shadowY}px 8px -3px rgb(var(--shadow-color) / 0.4)`,
        } as CSSProperties
      }
      className="relative aspect-[1000/987] w-[63vw] top-[4px] left-[2px] _rounded-xl rounded-full p-[1px] border border-transparent
      [background:content-box_var(--bg-content),padding-box_var(--bg-padding),border-box_var(--bg-border)]"
    >
      <motion.div
        className="opacity-20 pointer-events-none absolute -inset-px rounded-[inherit] transition duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              var(--light-color),
              transparent 80%
            )
          `,
        }}
      />
    </motion.div>
  )
}
