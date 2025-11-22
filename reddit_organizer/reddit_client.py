"""Reddit client for fetching saved posts and comments using PRAW."""

import praw
from typing import List, Dict, Any
from rich.console import Console
from rich.progress import Progress, SpinnerColumn, TextColumn

console = Console()


class RedditClient:
    """Handles Reddit API interactions using PRAW."""

    def __init__(self, username: str, password: str, client_id: str, client_secret: str):
        """
        Initialize Reddit client with user credentials.

        Args:
            username: Reddit username
            password: Reddit password
            client_id: Reddit app client ID
            client_secret: Reddit app client secret
        """
        self.username = username

        try:
            self.reddit = praw.Reddit(
                client_id=client_id,
                client_secret=client_secret,
                username=username,
                password=password,
                user_agent=f"SavedPostsOrganizer/1.0 by {username}"
            )
            console.print(f"[green]✓[/green] Successfully authenticated as u/{username}")
        except Exception as e:
            console.print(f"[red]✗[/red] Failed to authenticate: {str(e)}")
            raise

    def fetch_saved_posts(self) -> List[Dict[str, Any]]:
        """
        Fetch all saved posts from the authenticated user.

        Returns:
            List of dictionaries containing post data
        """
        saved_posts = []

        with Progress(
            SpinnerColumn(),
            TextColumn("[progress.description]{task.description}"),
            console=console,
        ) as progress:
            task = progress.add_task("Fetching saved posts...", total=None)

            try:
                for item in self.reddit.user.me().saved(limit=None):
                    if isinstance(item, praw.models.Submission):
                        post_data = {
                            'type': 'post',
                            'id': item.id,
                            'title': item.title,
                            'subreddit': str(item.subreddit),
                            'author': str(item.author) if item.author else '[deleted]',
                            'url': item.url,
                            'permalink': f"https://reddit.com{item.permalink}",
                            'selftext': item.selftext,
                            'score': item.score,
                            'num_comments': item.num_comments,
                            'created_utc': item.created_utc,
                            'is_self': item.is_self,
                            'link_flair_text': item.link_flair_text,
                        }
                        saved_posts.append(post_data)

                progress.update(task, completed=True)
                console.print(f"[green]✓[/green] Found {len(saved_posts)} saved posts")

            except Exception as e:
                console.print(f"[red]✗[/red] Error fetching posts: {str(e)}")
                raise

        return saved_posts

    def fetch_saved_comments(self) -> List[Dict[str, Any]]:
        """
        Fetch all saved comments from the authenticated user.

        Returns:
            List of dictionaries containing comment data
        """
        saved_comments = []

        with Progress(
            SpinnerColumn(),
            TextColumn("[progress.description]{task.description}"),
            console=console,
        ) as progress:
            task = progress.add_task("Fetching saved comments...", total=None)

            try:
                for item in self.reddit.user.me().saved(limit=None):
                    if isinstance(item, praw.models.Comment):
                        comment_data = {
                            'type': 'comment',
                            'id': item.id,
                            'body': item.body,
                            'subreddit': str(item.subreddit),
                            'author': str(item.author) if item.author else '[deleted]',
                            'permalink': f"https://reddit.com{item.permalink}",
                            'score': item.score,
                            'created_utc': item.created_utc,
                            'parent_id': item.parent_id,
                            'submission_title': item.submission.title if hasattr(item, 'submission') else 'N/A',
                        }
                        saved_comments.append(comment_data)

                progress.update(task, completed=True)
                console.print(f"[green]✓[/green] Found {len(saved_comments)} saved comments")

            except Exception as e:
                console.print(f"[red]✗[/red] Error fetching comments: {str(e)}")
                raise

        return saved_comments
