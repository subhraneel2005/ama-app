export function checkIfStringIsUrl(text: string) {
  try {
    const cleaned = text.trim();

    if (cleaned.includes(" ")) {
      console.log("not url");
      return false;
    }

    const url = new URL(
      cleaned.startsWith("http") ? cleaned : `http://${cleaned}`,
    );

    const hostname = url.hostname;

    if (/^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(hostname)) {
      console.log("url");
      return true;
    } else {
      console.log("not url");
      return false;
    }
  } catch (error) {
    console.log("not url");
    return false;
  }
}

// checkIfStringIsUrl("")
