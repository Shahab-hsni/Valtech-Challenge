import "@testing-library/jest-dom/extend-expect";
import axios from "axios";

afterEach(() => {
  axios.get.mockClear();
});

function mockCall() {
  axios.get.mockImplementationOnce(() => {
    Promise.resolve({
      data: {
        results: [
          {
            urls: {
              full: "",
              regular: "",
              thumbnail: "",
            },
          },
          {
            urls: {
              full: "",
              regular: "",
              thumbnail: "",
            },
          },
        ],
      },
    }).then((data) => console.log(data));
  });
}
test("fetching data", async () => {
  mockCall();
});
