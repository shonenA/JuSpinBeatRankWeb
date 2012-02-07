function makeUserRecords( records ) {
    var ret = '<tbody>';
    var r = new Array()
    var best = 0;
    for( i in records ) {
        records[i].name = i;
        var total = 0;
        for( j in records[i]['scores'] ) {
            total += new Number(records[i]['scores'][j]);
        }
        records[i].total = total;
        if( best < total ) best = total;
        r.push(records[i]);
    }
    r.sort(function(a, b) {
        return a.total > b.total ? -1 : 1;
    });

    function addCommas(nStr)
    {
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

    function formatScore( score, rank ) {
        if( typeof(rank) === 'undefined' ) {
            rank = score;
        }
        var html = '<span class="rank">';
        if( rank < 500000 ) html += "E";
        else if( rank < 700000 ) html += "D";
        else if( rank < 800000 ) html += "C";
        else if( rank < 850000 ) html += "B";
        else if( rank < 900000 ) html += "A";
        else if( rank < 950000 ) html += "S";
        else if( rank < 980000 ) html += "SS";
        else if( rank < 1000000 ) html += "SSS";
        else html += "EXC";
        html += '</span>';
        html += '<span class="score pull-right">'+addCommas(score)+'</span>';
        return html;
    }

    for( i in r ) {
        var c = r[i];
        var scores = c.scores;

        ret += '<tr class="record">';
        ret += '<td>' + (c.name + ' <span class="pull-right best-diff">(' + (addCommas(c.total - best)) + ')</span><br />' + c.last_played) + '</td>';

        var played = 0;
        cArray = scores// [].slice.call(c,0)
        for ( j in cArray )
        {
            ret += '<td>' + formatScore(cArray[j]) + '</td>';
            if( cArray[j] > 0 ) played++;
        }
        played = played?played:1;
        ret += '<td>' + formatScore(c.total, c.total/played) + '</td>';
        ret += "</tr>";
    }
    ret += '</tbody>';
    return ret;
}

function makeHeader( musiclist ) {
    var ret = '<thead><tr><th>User</th>';
    for( i in musiclist ) {
        var c = musiclist[i];
        var cl = "difficulty-" + c[1];
        ret += '<th class="'+ cl +'">' + c[0] + '</th>';
    }
    ret += "<th>Total</th></tr></thead>";
    return ret;
}

function makeHistory( history ) {
    var ret = '<table class="history"><thead>';
    ret += '<tr>';
    ret += '<th>Date</th>';
    ret += '<th>User</th>';
    ret += '<th>Music</th>';
    ret += '<th>Score</th>';
    ret += '</tr></thead><tbody>';
    for( i in history ) {
        var c = history[i];
        ret += '<tr>';
        ret += '<td>'+c.date+'</td>';
        ret += '<td>'+c.user_name+'</td>';
        ret += '<td class="difficulty-'+c.difficulty+'">'+c.music+'</td>';
        ret += '<td>'+c.score+'</td>';
        ret += '</tr>';
    }
    ret += '</tbody></table>';
    return ret;
}

function prepareHistory( history ) {
    history.sort(function(a,b){return a.date < b.date ? -1 : 1; });
    var table = {};
    for( i in history ) {
        var c = history[i];
        var key = c.user + ':' + c.music + ':' + c.difficulty;
        if( typeof(table[key]) === 'undefined' ) {
            table[key] = 0;
        }
        c.score = new Number(c.score);
        var diff = c.score - table[key];
        if( diff > 0 ) {
            table[key] = c.score;
        }
        if( diff >= 0 ) diff = '+' + diff;
        c.score += (' (' + diff + ')');
    }
}


