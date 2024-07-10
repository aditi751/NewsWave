import React, {useEffect, useState} from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false) 
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsWave`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const handlePreviousClick = async () => {
    setPage(page-1)
    updateNews()
  }

  const handleNextClick = async () => {
    setPage(page+1) 
    updateNews()
  }

  const myStyle = {
    color: props.mode === 'dark'?'white':'#08061c',
    backgroundColor: props.mode === 'dark'?'#08061c':'white',
  };

    return ( 
      <>
      <div className="container my-3" style={{...myStyle ,  padding: '20px' }} >
        <h2 className='text-center' style={{ marginTop: '40px'}}>NewsWave - Top {capitalizeFirstLetter(props.category)} Headlines </h2>
        {loading && <Spinner/>}
          <div className='row my-3'>
            {!loading && articles && articles.map((element)=> {
              return <div className="col-md-4 " key={element.url}>
                <NewsItem title={element.title?element.title.slice(0,45):" "} description={element.description?element.description.slice(0,88):" "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/> 
              </div>
            })}
          </div>
    </div>
    <div className =" container d-flex justify-content-between">
      <button disabled={page <= 1} type="button" className="btn" style={{backgroundColor: props.mode === 'dark'?'white':'black', color : props.mode === 'dark'?'black':'white' , margin: '20px'}} onClick={handlePreviousClick}>&larr; Previous</button>
      <button disabled={page +1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn" style={{backgroundColor: props.mode === 'dark'?'white':'black', color : props.mode === 'dark'?'black':'white' , margin: '20px'}} onClick={handleNextClick}>Next &rarr;</button>
    </div>
    </>
    )
}

export default News;
