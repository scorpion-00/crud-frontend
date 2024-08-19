import "./App.css";

const postUser = async () => {
  const user_name = document.getElementById("username-input").value;
  const user_email = document.getElementById("mail-input").value;
  const user_age = document.getElementById("age-input").value;
  try {
    const res = await fetch(process.env.REACT_APP_BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user_name,
        email: user_email,
        age: user_age,
      }),
    });
    const data = await res.json();
    const response =
      data.message || `User ${data.user.name} added successfully`;
    document.getElementsByClassName("output")[0].innerHTML = response;
  } catch (err) {
    console.error(err);
    document.getElementsByClassName("output")[0].innerHTML =
      "Error: " + err.message;
  }
};

const getUser = async () => {
  try {
    const res = await fetch(process.env.REACT_APP_BACKEND_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    var out = "";
    if (res.status === 404) {
      out = "No users found";
    } else {
      out = data
        .map((user) => `<p>${user.name} (${user.age}) - ${user.email}</p>`)
        .join("");
    }
    console.log(out);
    document.getElementsByClassName("output")[0].innerHTML = out;
  } catch (err) {
    console.error(err);
    document.getElementsByClassName("output")[0].innerHTML =
      "Error: " + err.message;
  }
};

const dltUser = async () => {
  const user_email = document.getElementById("mail-input").value;
  try {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/${user_email}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    const response = data.message || `User deleted successfully`;
    document.getElementsByClassName("output")[0].innerHTML = response;
  } catch (err) {
    console.error(err);
    document.getElementsByClassName("output")[0].innerHTML =
      "Error: " + err.message;
  }
};

function LoginPage() {
  return (
    <div className="app">
      <div className="card">
        <div className="title">
          <h1>User</h1>
        </div>
        <div className="username">
          <input id="username-input" type="text" placeholder="Username" />
        </div>
        <div className="mail">
          <input id="mail-input" type="email" placeholder="email" />
        </div>
        <div className="age">
          <input id="age-input" type="number" placeholder="age" />
        </div>
        <div className="submit" onClick={postUser}>
          <button>addUser</button>
        </div>
        <div className="submit" onClick={getUser}>
          <button>showUsers</button>
        </div>
        <div className="submit" onClick={dltUser}>
          <button>DeleteUser</button>
        </div>
        <div className="output"></div>
      </div>
    </div>
  );
}

export default LoginPage;
