const createDivWithClass = className => {
  const div = document.createElement("div");
  div.className = className;
  return div;
};

const createPlatformLine = (platform, value) =>
  `<p><span class="community-title ${platform}">${platform}:</span> ${value}</p>`;

const addAccountInfoDOM = account => {
  const accountEl = createDivWithClass("account");

  // thumbnail 추가
  if (account.thumbnail) {
    accountEl.innerHTML = `<img class="account-thumbnail" src="${
      account.thumbnail
    }">`;
  } else {
    accountEl.innerHTML = `<img class="account-thumbnail" src="https://api.adorable.io/avatars/128/${
      account.nickname
    }.png">`;
  }

  const accountInfoEl = createDivWithClass("account-info");

  // nickname 추가
  accountInfoEl.innerHTML += `<p class="nickname">${account.nickname}</p>`;

  // platform info 추가
  for (const platform in account) {
    if (platform !== "thumbnail" && platform !== "nickname") {
      accountInfoEl.innerHTML += createPlatformLine(
        platform,
        account[platform]
      );
    }
  }

  accountEl.appendChild(accountInfoEl);

  return accountEl;
};

fetch("./accounts.json")
  .then(res => res.json())
  .then(accounts => {
    const accountsDOM = createDivWithClass("accounts");
    const filteredAccounts = accounts.filter(account => "nickname" in account); // nickname 없는 data는 빼버림
    filteredAccounts.forEach(account => {
      accountsDOM.appendChild(addAccountInfoDOM(account));
    });

    document.body.appendChild(accountsDOM);
  });
