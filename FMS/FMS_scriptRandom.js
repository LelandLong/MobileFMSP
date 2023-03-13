import { FMS_HOST, FMS_DATABASE, FMS_LAYOUT_CONTACTS } from "../fmsKeys";

// - - - - - - - - - - - - - - - - - - - -

export const FMS_scriptForRandomContact = (token) => {
  const dynamicBody = "";
  const dynamicUrl =
    "https://" +
    FMS_HOST +
    "/fmi/data/vLatest/databases/" +
    FMS_DATABASE +
    "/layouts/" +
    FMS_LAYOUT_CONTACTS +
    "/script/RN_NewContactFromRandomUser.me?script.param=";

  console.log("FMS_scriptForRandomContact dynamicUrl: ", dynamicUrl);

  // - - - - - - - - - -

  return fetch(dynamicUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
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
      console.log(
        "FMS_scriptForRandomContact catch errorBlockString: ",
        errorBlockString
      );

      return new Promise((resolve, reject) => {
        let subString = "<title>502";
        if (errorBlockString.includes(`${subString}`)) {
          const composedError = {
            messages: [
              {
                code: 502,
                message: "FMS_scriptForRandomContact catch, 502 error",
              },
            ],
          };
          reject(JSON.stringify(composedError));
          //
          //
        } else if (errorBlockString !== "{}") {
          const errorBlock = JSON.parse(errorBlockString);
          console.log(
            "FMS_scriptForRandomContact catch return Promise errorBlock != {}, errorBlock: ",
            errorBlock
          );
          reject(JSON.stringify(errorBlock));
          //
          //
        } else {
          console.log(
            "FMS_scriptForRandomContact catch return Promise errorBlock == {}"
          );
          const composedError = {
            messages: [
              {
                code: -99,
                message: "FMS_scriptForRandomContact catch, no errorBlock",
              },
            ],
          };
          reject(JSON.stringify(composedError));
        }
      });
    });
};
