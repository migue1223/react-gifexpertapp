import React from 'react';
import '@testing-library/jest-dom';

import { shallow } from 'enzyme';
import { useFetchGifs } from '../../hooks/useFetchGifs';
import { GifGrid } from '../../components/GifGrid';
jest.mock('../../hooks/useFetchGifs');

describe('Pruebas en el <GifGrid', () => {
  const category = 'One Punch';

  test('Debe de mostrarse correctamente', () => {
    useFetchGifs.mockReturnValue({
      data: [],
      loading: true,
    });

    const wrapper = shallow(<GifGrid category={category} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Debe de mostrar items cuando se cargan imagenes useFecthGifs', () => {
    const gifs = [
      {
        id: 'ABC',
        url: 'https://localhost/cualquier/cosa.jpg',
        title: 'Cualquier cosas',
      },
      {
        id: '123',
        url: 'https://localhost/cualquier/cosa.jpg',
        title: 'Cualquier cosa',
      },
    ];

    useFetchGifs.mockReturnValue({
      data: gifs,
      loading: false,
    });

    const wrapper = shallow(<GifGrid category={category} />);

    expect(wrapper.find('p').exists()).toBe(false);
    expect(wrapper.find('GifGridItem').length).toBe(gifs.length);
  });
});
