<?php

    if (!$_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') die('Invalid request');

    $rss = new DOMDocument();
    $rss->load('http://localhost/blog/feed');
    $feed = array();
    foreach ($rss->getElementsByTagName('item') as $node) {
        $item = array (
            'title' => $node->getElementsByTagName('title')->item(0)->nodeValue,
            'desc' => $node->getElementsByTagName('description')->item(0)->nodeValue,
            'link' => $node->getElementsByTagName('link')->item(0)->nodeValue,
            'date' => $node->getElementsByTagName('pubDate')->item(0)->nodeValue,
            );
        array_push($feed, $item);
    }
    $limit = 3;
    for($x = 0; $x < $limit; $x++) {
        $title = str_replace(' & ', ' &amp; ', $feed[$x]['title']);
        $link = $feed[$x]['link'];
        $description = $feed[$x]['desc'];
        $date = date('F j, Y', strtotime($feed[$x]['date']));
        echo '<article>';
        echo '<header>';
        echo '  <h1 class="blog_title"><a href="' . $link . '" title="' . $title . '">' . $title . '</a></h3>';
        echo '  <p><em><time pubdate="pubdate">'.$date.'</time></em></p>';
        echo '  <p>' . $description . '</p>';
        echo '</header>';
        echo '</article>';
    }

?>
