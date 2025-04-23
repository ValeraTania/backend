const backend_path = `http://localhost:4000`;

function populateFiltersOptions() {
  const brandSelect = document.getElementById("brand");
  const typeSelect = document.getElementById("type");

  const requestOptions = {
    method: "GET",
    // body: raw,
    redirect: "follow",
  };

  fetch(`${backend_path}/prod/products/brands`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      result.forEach((brand) => {
        brandSelect.insertAdjacentHTML(
          "beforeend",
          `<option value="${brand}">${brand}</option>`
        );
      });
    })
    .catch((error) => console.error(error));

  fetch(`${backend_path}/prod/products/types`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      result.forEach((type) => {
        typeSelect.insertAdjacentHTML(
          "beforeend",
          `<option value="${type}">${type}</option>`
        );
      });
    })
    .catch((error) => console.error(error));
}

populateFiltersOptions();

function handleDeleteProduct(event) {
  if (confirm("Tem a certeza????")) {
    const productId = event.target.dataset.id;
    const accessToken = localStorage.getItem("accessToken");
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${accessToken}`);
    
    const requestOptions = {
      method: "DELETE",
      // body: raw,
      redirect: "follow",
      headers: headers,
    };
    fetch(`${backend_path}/prod/products/${productId}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          alert("You can't delete this product!");
          throw new Error("Error deleting product");
        }
        return response.json();
      })
      .then(() => {
        event.target.parentElement.parentElement.parentElement.remove();
      })
      .catch((error) => console.error(error));
  }
}

function handleFilterBtnClick() {
  const typeId = document.getElementById("type").value;
  const brandId = document.getElementById("brand").value;

  const queryParams = new URLSearchParams({
    type: typeId,
    brand: brandId,
  }).toString();

  const url = `${backend_path}/prod/products?${queryParams}`;

  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      const productContainer = document.querySelector(".product-list");
      result.forEach((product) => {
        let productElement = ` <div class="col-md-4 ">
                        <div class="card mb-4">
                            <div class="card-body">
                                <img src="${product.image_url}" alt = "${product.title}" class="card-img-top" />
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text">${product.brand}, ${product.type}</p>
                                <p class="card-text">${product.price}</p>
                                <p class="card-text">${product.description}</p>
                                <button data-id="${product.id} "class="btn-danger btn delete-btn">Delete</button>
                            </div>
                        </div>
                    </div>`;
        productContainer.insertAdjacentHTML("beforeend", productElement);
      });
      const deleteBtns = document.querySelectorAll(".delete-btn");
      deleteBtns.forEach((deleteBtn) =>
        deleteBtn.addEventListener("click", handleDeleteProduct)
      );
    })
    .catch((error) => console.error(error));
}
handleFilterBtnClick();

const loginForm = document.getElementById("loginForm");

async function login(email, password) {
  try {
    const response = await fetch(`${backend_path}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      alert("Login failed");
    } else {
      const data = await response.json();
      const { user, accessToken } = data;
      //store user info and accessToken in local storage
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("accessToken", accessToken);
      handleSuccessLogin();
      console.log(localStorage);
      // alert("Login with success!");

      const loginModal = document.getElementById("loginModal");
      let modal = bootstrap.Modal.getInstance(loginModal);
      modal.hide();
    }
  } catch (error) {
    console.log(error);
  }
}

function handleSuccessLogin() {
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");
  const userProfile = document.getElementById("userProfile");

  userProfile.innerHTML = `${userName}, <a href="#" id='logout' onclick='handleLogout()'>Logout</a>`;
  const loginContainer = document.getElementById("loginContainer");
  loginContainer.style.display = "none";

  const logoutBtn = document.getElementById("logout");
  logoutBtn.addEventListener("click", handleLogout());
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await login(email, password);
    console.log("Logged in successfully!");
  } catch (error) {
    console.log("Login failed: ", error);
  }
});

function checkLoggedInStatus() {
  const accessToken = localStorage.getItem("accessToken");
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");

  if (accessToken) {
    const loginContainer = document.getElementById("loginContainer");
    const userProfile = document.getElementById("userProfile");
    loginContainer.style.display = "none";
    userProfile.innerHTML = `${userName}, <a href="#" id='logout' onclick='handleLogout()'>Logout</a>`;
  }
}

checkLoggedInStatus();

function handleLogout() {
  localStorage.clear();
  const userProfile = document.getElementById("userProfile");
  loginContainer.style.display = "block";
  userProfile.innerHTML = ``;
}
