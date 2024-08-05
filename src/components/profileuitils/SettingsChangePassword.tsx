import React from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";

type PasswordInputsType = {
  id: number;
  label: string;
  type: string;
  placeholder?: string;
  value?: string;
};

const SettingsChangePassword: React.FC = () => {
  // Define for form inputs passwords change passwords inputs
  const InputFields: PasswordInputsType[] = [
    {
      id: 1,
      label: "Mövcud şifrə",
      type: "password",
      placeholder: "************",
      value: "",
    },
    {
      id: 2,
      label: "Yeni şifrə",
      type: "password",
      placeholder: "************",
      value: "",
    },
    {
      id: 3,
      label: "Şifrə yenidən",
      type: "password",
      placeholder: "************",
      value: "",
    },
  ];

  // Disable copy, cut, paste events
  React.useEffect(() => {
    const inputPasswords = document.querySelectorAll("input[type='password']");
    const stopPropagationEvents: EventListener = (event) => {
      event.preventDefault();
    };

    inputPasswords.forEach((input) => {
      input.addEventListener("copy", stopPropagationEvents);
      input.addEventListener("cut", stopPropagationEvents);
      input.addEventListener("paste", stopPropagationEvents);
      input.addEventListener("contextmenu", stopPropagationEvents);
    });

    // Cleanup function to remove event listeners
    return () => {
      inputPasswords.forEach((input) => {
        input.removeEventListener("copy", stopPropagationEvents);
        input.removeEventListener("cut", stopPropagationEvents);
        input.removeEventListener("paste", stopPropagationEvents);
        input.removeEventListener("contextmenu", stopPropagationEvents);
      });
    };
  }, []);

  // Show and hide password
  const [show, setShow] = React.useState<{ [key: number]: boolean }>({});

  const handlePassword = (id: number) => {
    setShow((prevShow) => ({
      ...prevShow,
      [id]: !prevShow[id],
    }));
  };

  return (
    <div className="change-password-section">
      <div className="head-title">
        <span>Şifrəni dəyiş</span>
      </div>

      <form className="password-fields">
        {InputFields.map((item) => (
          <div key={item.id} className="current-password-field">
            <label htmlFor={`input-${item.id}`}>{item.label}</label>
            <div className="input">
              <input
                required
                id={`input-${item.id}`}
                type={show[item.id] ? "text" : "password"}
                placeholder={item.placeholder}
              />
              {show[item.id] ? (
                <GoEye className="eye-closed" onClick={() => handlePassword(item.id)} />
              ) : (
                <GoEyeClosed className="eye-closed" onClick={() => handlePassword(item.id)} />
              )}
            </div>
          </div>
        ))}

        <button type="submit">Şifrəni dəyiş</button>
      </form>
    </div>
  );
};

export default SettingsChangePassword;
