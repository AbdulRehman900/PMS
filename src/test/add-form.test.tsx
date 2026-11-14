import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AddForm } from "@/components/AddForm";

afterEach(cleanup);

describe("AddForm", () => {
  it("shows a validation message instead of silently rejecting whitespace-only input", () => {
    const onAdd = vi.fn();
    render(<AddForm title="Add item" fields={[{ name: "name", label: "Name" }]} onAdd={onAdd} />);

    fireEvent.click(screen.getByRole("button", { name: "+ Add item" }));
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "   " } });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(screen.getByRole("alert")).toHaveTextContent("Complete all fields before saving.");
    expect(onAdd).not.toHaveBeenCalled();
  });

  it("keeps the form open and displays an API error when saving fails", async () => {
    const onAdd = vi.fn().mockRejectedValue(new Error("Service unavailable"));
    render(<AddForm title="Add item" fields={[{ name: "name", label: "Name" }]} onAdd={onAdd} />);

    fireEvent.click(screen.getByRole("button", { name: "+ Add item" }));
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Pump" } });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Service unavailable");
    expect(screen.getByLabelText("Name")).toHaveValue("Pump");
  });

  it("blocks duplicate values and constrains count fields to non-negative integers", () => {
    render(
      <AddForm
        title="Add spare"
        fields={[{ name: "number", label: "Part number" }, { name: "quantity", label: "Quantity", type: "number" }]}
        validate={() => "This part already exists."}
        onAdd={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "+ Add spare" }));
    expect(screen.getByLabelText("Quantity")).toHaveAttribute("min", "0");
    expect(screen.getByLabelText("Quantity")).toHaveAttribute("step", "1");
    fireEvent.change(screen.getByLabelText("Part number"), { target: { value: "PART-1" } });
    fireEvent.change(screen.getByLabelText("Quantity"), { target: { value: "1" } });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    return waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("This part already exists."));
  });
});
