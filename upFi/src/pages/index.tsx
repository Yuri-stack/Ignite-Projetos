/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-nested-ternary */
import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const getImages = ({ pageParam = null }) => api.get('/api/images', { params: { after: pageParam } })

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    getImages, { // TODO AXIOS REQUEST WITH PARAM
    getNextPageParam: lastPage => lastPage.data.after ?? null // TODO GET AND RETURN NEXT PAGE PARAM
  }
  );

  const formattedData = useMemo(() => {
    return data?.pages.map(page => page.data).flat() // TODO FORMAT AND FLAT DATA ARRAY
  }, [data]);

  // TODO RENDER LOADING SCREEN
  if (isLoading){
    return <Loading />
  }

  // TODO RENDER ERROR SCREEN
  if (isError){
    return <Error />
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          { isFetchingNextPage 
            ? 'Carregar mais' 
            : hasNextPage
            ? 'Carregando'
            : 'Nada mais a carregar'
          }
        </Button>

      </Box>
    </>
  );
}
