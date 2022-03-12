//**_______________________________________________________________________________________________________________________________________________*/
import { render, screen } from '@testing-library/react';
import App from './App';
import data from "./data.json"

describe('Star Wars App', () => { 
beforeAll(() => jest.spyOn(window, "fetch"))

  // test('Debe de mostrar una lista con los personajes incluido Luke Skywalker', () => { 
  //   render(<App />)
  //   expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
  //  })
   
  //  test("Debe de mostrar una lista de personajes del archivo JSON", () => {
  //    render(<App />)
  //    for (let character of data.results) {
  //      expect(screen.getByText(character.name)).toBeInTheDocument()
  //    }
  //  })

   test("Debe de mostrar una lista de los personajes desde el API", async() => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => data,
    })

    render(<App />)
    expect(window.fetch).toHaveBeenCalledTimes(27)
    expect(window.fetch).toHaveBeenCalledWith('https://swapi.dev/api/people/')

    for (let character of data.results) {
      expect( await screen.findByText(character.name)).toBeInTheDocument()
    }
   })

   test('Debe de mostrar un error cuando haya un problema en la red', async() => {
     window.fetch.mockRejectedValueOnce(new Error("Network Error"))

     render(<App />)
     expect(await screen.findByText("Network error")).toBeInTheDocument()
   })
 })