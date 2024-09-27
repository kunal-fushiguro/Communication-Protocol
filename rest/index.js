import express from "express";

const PORT = 3000;
const app = express();

// data
let problems = [
  {
    id: 0,
    title: "Polyfill of Array.map",
    description: "Some description",
  },
  {
    id: 1,
    title: "Polyfill of Promise.all()",
    description: "Some description",
  },
];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// GET request
app.get("/api/problems", (_, res) => {
  try {
    res.status(200).json({
      success: true,
      messgae: "Data fetched successfully",
      data: problems,
    });
  } catch (error) {
    res.status(error.statusCode).json(error);
  }
});

// POST request
app.post("/api/problems", (req, res) => {
  try {
    const data = req.body;

    problems = [...problems, data];

    res.status(201).json({
      success: true,
      messgae: "Problem created successfully",
    });
  } catch (error) {
    res.status(error.statusCode).json(error);
  }
});

// DELETE request
app.delete("/api/problems/:id", (req, res) => {
  try {
    const data = req.params.id;

    problems = problems.filter((problem) => problem.id != data);

    res.status(200).json({
      success: true,
      messgae: "Problem deleted successfully",
    });
  } catch (error) {
    res.status(error.statusCode).json(error);
  }
});

// PUT request
app.put("/api/problems/:id", (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    problems = problems.map((problem) => {
      if (problem.id == id) {
        return {
          id: problem.id,
          ...data,
        };
      }
      return problem;
    });

    res.status(200).json({
      success: true,
      messgae: "Problem updated successfully",
    });
  } catch (error) {
    res.status(error.statusCode).json(error);
  }
});

// PATCH request
app.patch("/api/problems/:id", (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    problems = problems.map((problem) => {
      if (problem.id == id) {
        return {
          id: problem.id,
          title: problem.title,
          ...data,
        };
      }
      return problem;
    });

    res.status(200).json({
      success: true,
      messgae: "Problem updated successfully",
    });
  } catch (error) {
    res.status(error.statusCode).json(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server Started on PORT ${PORT}`);
});
