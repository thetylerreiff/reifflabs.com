import { render, screen } from "@testing-library/react"
import { Title } from "."

describe("<Title />", () => {
  it("should render children when provided", () => {
    render(<Title>Hello Title</Title>)
    expect(screen.getByText(/hello title/i)).toBeInTheDocument()
  })
})
