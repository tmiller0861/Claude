"""Organizer module for creating a second brain from Reddit saved content."""

import os
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Any
from collections import defaultdict
from rich.console import Console

console = Console()


class SecondBrainOrganizer:
    """Organizes Reddit saved content into a structured second brain format."""

    def __init__(self, output_dir: str = "output"):
        """
        Initialize the organizer.

        Args:
            output_dir: Directory to save organized content
        """
        self.output_dir = Path(output_dir)
        self.posts_dir = self.output_dir / "posts"
        self.comments_dir = self.output_dir / "comments"
        self.index_dir = self.output_dir / "index"

        # Create directory structure
        self.posts_dir.mkdir(parents=True, exist_ok=True)
        self.comments_dir.mkdir(parents=True, exist_ok=True)
        self.index_dir.mkdir(parents=True, exist_ok=True)

    def organize_posts(self, posts: List[Dict[str, Any]]) -> None:
        """
        Organize posts by subreddit into markdown files.

        Args:
            posts: List of post dictionaries
        """
        console.print("\n[bold blue]Organizing posts...[/bold blue]")

        # Group posts by subreddit
        posts_by_subreddit = defaultdict(list)
        for post in posts:
            posts_by_subreddit[post['subreddit']].append(post)

        # Create a file for each subreddit
        for subreddit, subreddit_posts in posts_by_subreddit.items():
            subreddit_file = self.posts_dir / f"{subreddit}.md"

            with open(subreddit_file, 'w', encoding='utf-8') as f:
                f.write(f"# r/{subreddit} - Saved Posts\n\n")
                f.write(f"Total posts: {len(subreddit_posts)}\n\n")
                f.write("---\n\n")

                # Sort posts by score (highest first)
                sorted_posts = sorted(subreddit_posts, key=lambda x: x['score'], reverse=True)

                for post in sorted_posts:
                    self._write_post_to_markdown(f, post)

            console.print(f"  [green]✓[/green] Created {subreddit}.md ({len(subreddit_posts)} posts)")

        # Create master index
        self._create_posts_index(posts_by_subreddit)

        console.print(f"\n[green]✓[/green] Organized {len(posts)} posts into {len(posts_by_subreddit)} subreddit files")

    def organize_comments(self, comments: List[Dict[str, Any]]) -> None:
        """
        Organize comments by subreddit into markdown files.

        Args:
            comments: List of comment dictionaries
        """
        console.print("\n[bold blue]Organizing comments...[/bold blue]")

        # Group comments by subreddit
        comments_by_subreddit = defaultdict(list)
        for comment in comments:
            comments_by_subreddit[comment['subreddit']].append(comment)

        # Create a file for each subreddit
        for subreddit, subreddit_comments in comments_by_subreddit.items():
            subreddit_file = self.comments_dir / f"{subreddit}.md"

            with open(subreddit_file, 'w', encoding='utf-8') as f:
                f.write(f"# r/{subreddit} - Saved Comments\n\n")
                f.write(f"Total comments: {len(subreddit_comments)}\n\n")
                f.write("---\n\n")

                # Sort comments by score (highest first)
                sorted_comments = sorted(subreddit_comments, key=lambda x: x['score'], reverse=True)

                for comment in sorted_comments:
                    self._write_comment_to_markdown(f, comment)

            console.print(f"  [green]✓[/green] Created {subreddit}.md ({len(subreddit_comments)} comments)")

        # Create master index
        self._create_comments_index(comments_by_subreddit)

        console.print(f"\n[green]✓[/green] Organized {len(comments)} comments into {len(comments_by_subreddit)} subreddit files")

    def _write_post_to_markdown(self, file, post: Dict[str, Any]) -> None:
        """Write a single post to markdown format."""
        date = datetime.fromtimestamp(post['created_utc']).strftime('%Y-%m-%d %H:%M:%S')

        file.write(f"## {post['title']}\n\n")
        file.write(f"**Author:** u/{post['author']} | ")
        file.write(f"**Score:** {post['score']} | ")
        file.write(f"**Comments:** {post['num_comments']} | ")
        file.write(f"**Date:** {date}\n\n")

        if post['link_flair_text']:
            file.write(f"**Flair:** {post['link_flair_text']}\n\n")

        file.write(f"**Link:** [{post['permalink']}]({post['permalink']})\n\n")

        if post['is_self'] and post['selftext']:
            file.write("**Content:**\n\n")
            file.write(f"{post['selftext']}\n\n")
        elif not post['is_self']:
            file.write(f"**URL:** {post['url']}\n\n")

        file.write("---\n\n")

    def _write_comment_to_markdown(self, file, comment: Dict[str, Any]) -> None:
        """Write a single comment to markdown format."""
        date = datetime.fromtimestamp(comment['created_utc']).strftime('%Y-%m-%d %H:%M:%S')

        file.write(f"## Comment by u/{comment['author']}\n\n")
        file.write(f"**Score:** {comment['score']} | ")
        file.write(f"**Date:** {date}\n\n")
        file.write(f"**Post:** {comment['submission_title']}\n\n")
        file.write(f"**Link:** [{comment['permalink']}]({comment['permalink']})\n\n")
        file.write("**Comment:**\n\n")
        file.write(f"> {comment['body'].replace(chr(10), chr(10) + '> ')}\n\n")
        file.write("---\n\n")

    def _create_posts_index(self, posts_by_subreddit: Dict[str, List[Dict[str, Any]]]) -> None:
        """Create a master index of all saved posts."""
        index_file = self.index_dir / "posts_index.md"

        with open(index_file, 'w', encoding='utf-8') as f:
            f.write("# Saved Posts - Master Index\n\n")
            f.write(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
            f.write("---\n\n")

            # Summary
            total_posts = sum(len(posts) for posts in posts_by_subreddit.values())
            f.write(f"**Total Posts:** {total_posts}\n\n")
            f.write(f"**Total Subreddits:** {len(posts_by_subreddit)}\n\n")
            f.write("---\n\n")

            # List subreddits with post counts
            f.write("## Subreddits\n\n")

            sorted_subreddits = sorted(
                posts_by_subreddit.items(),
                key=lambda x: len(x[1]),
                reverse=True
            )

            for subreddit, posts in sorted_subreddits:
                f.write(f"- **r/{subreddit}** - {len(posts)} posts - [View](../posts/{subreddit}.md)\n")

        console.print(f"  [green]✓[/green] Created master index at index/posts_index.md")

    def _create_comments_index(self, comments_by_subreddit: Dict[str, List[Dict[str, Any]]]) -> None:
        """Create a master index of all saved comments."""
        index_file = self.index_dir / "comments_index.md"

        with open(index_file, 'w', encoding='utf-8') as f:
            f.write("# Saved Comments - Master Index\n\n")
            f.write(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
            f.write("---\n\n")

            # Summary
            total_comments = sum(len(comments) for comments in comments_by_subreddit.values())
            f.write(f"**Total Comments:** {total_comments}\n\n")
            f.write(f"**Total Subreddits:** {len(comments_by_subreddit)}\n\n")
            f.write("---\n\n")

            # List subreddits with comment counts
            f.write("## Subreddits\n\n")

            sorted_subreddits = sorted(
                comments_by_subreddit.items(),
                key=lambda x: len(x[1]),
                reverse=True
            )

            for subreddit, comments in sorted_subreddits:
                f.write(f"- **r/{subreddit}** - {len(comments)} comments - [View](../comments/{subreddit}.md)\n")

        console.print(f"  [green]✓[/green] Created master index at index/comments_index.md")

    def create_main_index(self) -> None:
        """Create a main README with overview of all content."""
        readme_file = self.output_dir / "README.md"

        with open(readme_file, 'w', encoding='utf-8') as f:
            f.write("# Reddit Saved Content - Second Brain\n\n")
            f.write(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
            f.write("This is your organized collection of saved Reddit posts and comments.\n\n")
            f.write("## Structure\n\n")
            f.write("```\n")
            f.write("output/\n")
            f.write("├── README.md              (this file)\n")
            f.write("├── index/\n")
            f.write("│   ├── posts_index.md     (master index of all posts)\n")
            f.write("│   └── comments_index.md  (master index of all comments)\n")
            f.write("├── posts/\n")
            f.write("│   └── [subreddit].md     (posts organized by subreddit)\n")
            f.write("└── comments/\n")
            f.write("    └── [subreddit].md     (comments organized by subreddit)\n")
            f.write("```\n\n")
            f.write("## Quick Links\n\n")
            f.write("- [Posts Index](index/posts_index.md)\n")
            f.write("- [Comments Index](index/comments_index.md)\n")

        console.print(f"\n[green]✓[/green] Created main README at output/README.md")
