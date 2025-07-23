"use client"

import type { ButtonHTMLAttributes, HTMLAttributes } from "react"
import { ThemeProvider, useTheme } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import * as React from "react"
import { LuMoon, LuSun } from "react-icons/lu"
import { motion, AnimatePresence } from "framer-motion"

export function ColorModeProvider(props: ThemeProviderProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
  )
}

export type ColorMode = "light" | "dark"

export interface UseColorModeReturn {
  colorMode: ColorMode
  setColorMode: (colorMode: ColorMode) => void
  toggleColorMode: () => void
}

export function useColorMode(): UseColorModeReturn {
  const { resolvedTheme, setTheme, forcedTheme } = useTheme()
  const colorMode = forcedTheme || resolvedTheme
  const toggleColorMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }
  return {
    colorMode: colorMode as ColorMode,
    setColorMode: setTheme,
    toggleColorMode,
  }
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode()
  return colorMode === "dark" ? dark : light
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode()
  return colorMode === "dark" ? <LuMoon /> : <LuSun />
}

export const ColorModeButton = React.forwardRef<
  HTMLButtonElement,
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label">
>(function ColorModeButton(props, ref) {
  const { toggleColorMode } = useColorMode()
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      {!isClient ? (
        <div className="w-8 h-8 rounded-full bg-gray-200" />
      ) : (
        <motion.button
          ref={ref}
          onClick={toggleColorMode}
          aria-label="Toggle color mode"
          className="
            bg-transparent border-none cursor-pointer 
            w-8 h-8 rounded-full flex items-center justify-center
            hover:bg-gray-100 dark:hover:bg-gray-700
            transition-colors duration-200
          "
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          // Only spread props that are safe for motion.button
          {...Object.fromEntries(
            Object.entries(props).filter(
              ([key]) => !key.startsWith("onDrag")
            )
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isClient ? "loaded" : "loading"}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="text-lg"
            >
              <ColorModeIcon />
            </motion.span>
          </AnimatePresence>
        </motion.button>
      )}
    </>
  )
})

export const LightMode = React.forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  function LightMode(props, ref) {
    return (
      <span
        ref={ref}
        className="chakra-theme light contents"
        {...props}
      />
    )
  }
)

export const DarkMode = React.forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  function DarkMode(props, ref) {
    return (
      <span
        ref={ref}
        className="chakra-theme dark contents"
        {...props}
      />
    )
  }
)