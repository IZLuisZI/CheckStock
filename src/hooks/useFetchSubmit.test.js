import { renderHook, act } from "@testing-library/react-hooks";
import useSubmitAndFetch from "./useFetchSubmit";

describe("useSubmitAndFetch", () => {
  it("should update inputValue when handleChange is called", () => {
    const { result } = renderHook(() => useSubmitAndFetch());

    act(() => {
      result.current.handleChange({ target: { value: "example" } });
    });

    expect(result.current.inputValue).toBe("example");
  });

  it("should update data and loading when handleSubmit is called", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useSubmitAndFetch());

    act(() => {
      result.current.handleSubmit({ preventDefault: jest.fn() });
    });

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual({
      /* expected data object */
    });
  });
});
