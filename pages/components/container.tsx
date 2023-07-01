import React from "react"

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ "maxWidth": "1166px", "margin": "0 auto" }}>
      {children}
    </div>
  )
}

export default Container
