import { FMS_HOST, FMS_DATABASE } from "../fmsKeys";

// - - - - - - - - - - - - - - - - - - - -

export const logout = (token) => {
  const dynamicUrl =
    "https://" +
    FMS_HOST +
    "/fmi/data/vLatest/databases/" +
    FMS_DATABASE +
    "/sessions/" +
    token;

  console.log("logout dynamicUrl: ", dynamicUrl);

  // - - - - - - - - - -

  return fetch(dynamicUrl, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return new Promise((resolve, reject) => {
        if (response.status < 400) {
          resolve(response.json());
        } else {
          response.text().then((errorMessage) => {
            reject(errorMessage);
          });
        }
      });
    })
    .catch((error) => {
      const errorBlockString = JSON.stringify(error);
      console.log("logout catch errorBlockString: ", errorBlockString);

      return new Promise((resolve, reject) => {
        let subString = "<title>502";
        if (errorBlockString.includes(`${subString}`)) {
          const composedError = {
            messages: [{ code: 502, message: "logout catch, 502 error" }],
          };
          reject(JSON.stringify(composedError));
          //
          //
        } else if (errorBlockString !== "{}") {
          const errorBlock = JSON.parse(errorBlockString);
          console.log(
            "logout catch return Promise errorBlock != {}, errorBlock: ",
            errorBlock
          );
          reject(JSON.stringify(errorBlock));
          //
          //
        } else {
          console.log("logout catch return Promise errorBlock == {}");
          const composedError = {
            messages: [
              {
                code: -99,
                message: "logout catch, no errorBlock",
              },
            ],
          };
          reject(JSON.stringify(composedError));
        }
      });
    });
};
