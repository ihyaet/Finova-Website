'use client'

import { createContext, useContext, useState } from 'react'

type LenisCtx = { enabled: boolean; toggle: () => void }

const LenisContext = createContext<LenisCtx>({ enabled: true, toggle: () => {} })

export function LenisContextProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(true)
  return (
    <LenisContext.Provider value={{ enabled, toggle: () => setEnabled(e => !e) }}>
      {children}
    </LenisContext.Provider>
  )
}

export const useLenisContext = () => useContext(LenisContext)
