import { FMS_HOST, FMS_DATABASE, FMS_LAYOUT_CONTACTS } from "../fmsKeys";

// - - - - - - - - - - - - - - - - - - - -

export const FMS_createNewContact = (token, contact) => {
  const dynamicBody = {
    fieldData: {
      Name_First: contact.fieldData.Name_First,
      Name_Last: contact.fieldData.Name_Last,
      Title: contact.fieldData.Title,
      Account_Name: contact.fieldData.Account_Name,
      Primary_Street1: contact.fieldData.Primary_Street1,
      Primary_Street2: contact.fieldData.Primary_Street2,
      Primary_City: contact.fieldData.Primary_City,
      Primary_State_Prov1: contact.fieldData.Primary_State_Prov1,
      Primary_Postal_Code1: contact.fieldData.Primary_Postal_Code1,
      Primary_Country: contact.fieldData.Primary_Country,
      Phone1: contact.fieldData.Phone1,
      Email: contact.fieldData.Email,
    },
  };
  const dynamicUrl =
    "https://" +
    FMS_HOST +
    "/fmi/data/vLatest/databases/" +
    FMS_DATABASE +
    "/layouts/" +
    FMS_LAYOUT_CONTACTS +
    "/records/";

  console.log("FMS_createNewContact dynamicUrl: ", dynamicUrl);
  console.log(
    "FMS_createNewContact dynamicBody: ",
    JSON.stringify(dynamicBody)
  );

  // - - - - - - - - - -

  return fetch(dynamicUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(dynamicBody),
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
        "FMS_createNewContact catch errorBlockString: ",
        errorBlockString
      );

      return new Promise((resolve, reject) => {
        let subString = "<title>502";
        if (errorBlockString.includes(`${subString}`)) {
          const composedError = {
            messages: [
              { code: 502, message: "FMS_createNewContact catch, 502 error" },
            ],
          };
          reject(JSON.stringify(composedError));
          //
          //
        } else if (errorBlockString !== "{}") {
          const errorBlock = JSON.parse(errorBlockString);
          console.log(
            "FMS_createNewContact catch return Promise errorBlock != {}, errorBlock: ",
            errorBlock
          );
          reject(JSON.stringify(errorBlock));
          //
          //
        } else {
          console.log(
            "FMS_createNewContact catch return Promise errorBlock == {}"
          );
          const composedError = {
            messages: [
              {
                code: -99,
                message: "FMS_createNewContact catch, no errorBlock",
              },
            ],
          };
          reject(JSON.stringify(composedError));
        }
      });
    });
};
