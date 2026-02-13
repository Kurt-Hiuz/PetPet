import classes from './styles/NewsFeed.module.css'

export default function NewsFeed({children}){
    if(children){
        return <div className={classes.news_feed}>{children}</div>
    }
    return <></>
}