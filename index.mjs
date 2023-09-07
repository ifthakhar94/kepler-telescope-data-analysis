import { parse } from "csv-parse";
import { createReadStream } from "fs";

const habitAblePlanets = [];
function isHabitablePlanate(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.16
  );
}
createReadStream("kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    if (isHabitablePlanate(data)) {
      habitAblePlanets.push(data);
    }
  })
  .on("error", (err) => {
    console.error(err);
  })
  .on("end", () => {
    console.log(habitAblePlanets);
    console.log(
      habitAblePlanets.map((planet) => {
        return planet["kepler_name"];
      })
    );
    console.log("Done");
  });
