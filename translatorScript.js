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
        "X-RapidAPI-Key": "75bbf87086msha9b2c4937cedabap194c28jsn0d1de7105c73",
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
      console.log(translatedText)
      textArray2.value = translatedText
    } catch (error) {
      console.error(error)
    }
  }
  textArray1.addEventListener("change", () => {
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
