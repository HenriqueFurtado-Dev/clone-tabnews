function status(request, response) {
  response.status(200).json(
    {
      chave: "Alunos do curso.dev são gente boa",
      outrachave: "Outro valor"
    }
  )
}

export default status;