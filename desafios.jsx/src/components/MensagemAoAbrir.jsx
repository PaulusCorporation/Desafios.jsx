import React, {useEffect} from 'react'

const MensagemAoAbrir = () => {

    useEffect(() => {
        console.log("Componente carregado!")
        alert("Bem-vindo(a)!")

    },[])

  return (
    <div>
      <h1>Página carregada com sucesso!</h1>
    </div>
  )
}

export default MensagemAoAbrir