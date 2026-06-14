<div id="video-wrapper">
    <video id="mainPlayer" src="video1.mp4" controls></video>
    <div class="actions">
        <button onclick="likeVideo()">点赞 (<span id="likeCount">0</span>)</button>
    </div>
</div>

<div id="comment-section">
    <input type="text" id="commentInput" placeholder="写下你的评论...">
    <button onclick="addComment()">提交</button>
    <ul id="commentList"></ul>
</div>

<script>
    let likes = 0;
    // 自动轮播逻辑
    const videoList = ["video1.mp4", "video2.mp4", "video3.mp4"];
    let currentIndex = 0;
    const player = document.getElementById('mainPlayer');

    player.onended = () => {
        currentIndex = (currentIndex + 1) % videoList.length;
        player.src = videoList[currentIndex];
        player.play();
    };

    function likeVideo() {
        likes++;
        document.getElementById('likeCount').innerText = likes;
    }

    function addComment() {
        const text = document.getElementById('commentInput').value;
        const li = document.createElement('li');
        li.innerText = text;
        document.getElementById('commentList').appendChild(li);
        document.getElementById('commentInput').value = '';
    }
</script>
