function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    blacklist: document.querySelector("#blacklist").value
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#blacklist").value = result.blacklist || document.querySelector("#blacklist").value
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get("blacklist");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
