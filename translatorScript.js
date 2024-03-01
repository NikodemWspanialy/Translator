window.onload = async () => {
  let toEnglish = true

  const textArray1 = document.getElementById("input-one")
  const textArray2 = document.getElementById("input-two")

  const Languages = {
    polishShort: "pl",
    polish: "polski",
    englishShort: "en",
    english: "angielski",
  }
  async function translate() {
    let question = textArray1.value
    let target = toEnglish ? Languages.englishShort : Languages.polishShort
    let source = toEnglish ? Languages.polishShort : Languages.englishShort

    const url = "https://google-translate1.p.rapidapi.com/language/translate/v2"
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "application/gzip",
        "X-RapidAPI-Key": null, //personal key avaiable on page: https://google-translate1.p.rapidapi.com
        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
      },
      body: new URLSearchParams({
        q: question,
        target: target,
        source: source,
      }),
    }
    console.log(question, target, source)
    try {
      const response = await fetch(url, options)
      const result = await response.text()
      const jsonResult = JSON.parse(result)
      const translatedText = jsonResult.data.translations[0].translatedText
      textArray2.value = translatedText
    } catch (error) {
      console.log(error)
      textArray2.value =
        "Something gone wrong. Check your Subscription or network connection"
    }
  }
  textArray1.addEventListener("input", () => {
    translate()
  })
  document.getElementById("swap-btn").addEventListener("click", () => {
    if (toEnglish) {
      document.getElementById("firstLang").innerText = Languages.english
      document.getElementById("secondLang").innerText = Languages.polish
    } else {
      document.getElementById("firstLang").innerText = Languages.polish
      document.getElementById("secondLang").innerText = Languages.english
    }
    toEnglish = !toEnglish
    textArray1.value = textArray2.value
    translate()
  })
}
