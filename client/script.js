const backend_path = "http://localhost:4003/prod";

function populateFiltersOptions() {
  const brandSelect = document.getElementById("brand");
  const typeSelect = document.getElementById("type");

  const requestOptions = {
    method: "GET",
    // body: raw,
    redirect: "follow",
  };

  fetch(`${backend_path}/products/brands`, requestOptions)
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

  fetch(`${backend_path}/products/types`, requestOptions)
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

    const requestOptions = {
      method: "DELETE",
      // body: raw,
      redirect: "follow",
    };
    fetch(`${backend_path}/products/${productId}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
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

  const url = `${backend_path}/products?${queryParams}`;

  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      const productContainer = document.querySelector(".product-list");
      result.forEach((product) => {
        let productElement = ` <div class="col-md-4">
                        <div class="card">
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
