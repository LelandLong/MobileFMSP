import { FMS_HOST, FMS_DATABASE } from "../fmsKeys";

// - - - - - - - - - - - - - - - - - - - -

export const getToken = () => {
  //   const encodedCredentials = Base64Encode(FMS_USERNAME & ":" & FMS_PASSWORD);
  const encodedCredentials = "RGF0YUFQSV9SZWFjdE5hdGl2ZTpKYXZhU2NyaXB0Uk4=";
  const dynamicBody = "{}";
  const dynamicUrl =
    "https://" +
    FMS_HOST +
    "/fmi/data/vLatest/databases/" +
    FMS_DATABASE +
    "/sessions";

  console.log("getToken dynamicUrl: ", dynamicUrl);

  // - - - - - - - - - -

  return fetch(dynamicUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Basic " + encodedCredentials,
    },
    body: dynamicBody,
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
      console.log("getToken catch errorBlockString: ", errorBlockString);

      return new Promise((resolve, reject) => {
        let subString = "<title>502";
        if (errorBlockString.includes(`${subString}`)) {
          const composedError = {
            messages: [{ code: 502, message: "getToken catch, 502 error" }],
          };
          reject(JSON.stringify(composedError));
          //
          //
        } else if (errorBlockString !== "{}") {
          const errorBlock = JSON.parse(errorBlockString);
          console.log(
            "getToken catch return Promise errorBlock != {}, errorBlock: ",
            errorBlock
          );
          reject(JSON.stringify(errorBlock));
          //
          //
        } else {
          console.log("getToken catch return Promise errorBlock == {}");
          const composedError = {
            messages: [
              {
                code: -99,
                message: "getToken catch, no errorBlock",
              },
            ],
          };
          reject(JSON.stringify(composedError));
        }
      });
    });
};
