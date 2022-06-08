export function addInputListener(input) {
  input.addEventListener("click", () => {
    console.log(input.value);
  });
}
