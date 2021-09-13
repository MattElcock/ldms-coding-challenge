const getNotes = async (timeFilter: string) => {
  const url = new URL("http://localhost:3000/api/notes");

  if (timeFilter === "sixMonths") {
    const date = new Date();
    date.setMonth(date.getMonth() - 6);
    url.searchParams.append("from", date.toISOString().split("T")[0]);
  }

  const data = await fetch(url.toString())
    .then((result) => result.json())
    .then((data) => data);

  return data;
};

export default getNotes;
