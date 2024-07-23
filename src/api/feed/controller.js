const repository = require('./repository')

exports.index = async (req, res) => {
    const { page = 1, size = 10, keyword = '' } = req.query;

    const trimmedKeyword = keyword.trim().toLowerCase();

    const items = await repository.index(page, size,
trimmedKeyword);

    const modifiedItems = items.map(item => ({
        ...item,
        is_me: (userId == item.user_id)
    }));
    
    res.json({ result: 'ok', data: modifiedItems });
}

exports.store = async (req, res) => {
    const body = req.body;
    const user = req.user;

    const result = await repository.create(user.id, body.title, body.content,
body.price, body.imageId);
    if (result.affectedRows > 0) {
        res.send({ result: 'ok', data: result.insertId });
    } else {
        res.send({ result: 'fail', message: '오류가 발생하였습니다.' });
    }
}

exports.show = async (req, res) => {
    const id = req.params.id;
    const user = req.user;

    const item = await repository.show(id);

    const modifiedItem = {
        ...item,
        writer: {
            id: item.user_id,
            name: item.user_name,
            profile_id: item.user_profile
        }
    };

    delete modifiedItem.user_id;
    delete modifiedItem.user_name;
    delete modifiedItem.user_profile;

    modifiedItem['is_me'] = (user.id == item.user_id);

    res.send({ result: 'ok', data: modifiedItem });
}


exports.update = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const user = req.user;

    const item = await repository.show(id);

    if (user.id !== item.user_id) {
        res.send({ result: 'fail', message: '타인의 글을 수정할 수 없습니다.' })
    }

    const result = await repository.update(body.title, body.content, body.price,
body.imageId, id);
    if (result.affectedRows > 0) {
        res.send({ result: 'ok', data: body });
    } else {
        res.send({ result: 'fail', message: '오류가 발생하였습니다.' });
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    const user = req.user;

    const item = await repository.show(id);

    if (user.id !== item.user_id) {
        res.send({ result: 'fail', message: '타인의 글을 삭제 할수 없습니다.' })
    } else {
        await repository.delete(id);
    res.send({ result: "ok", data: id });
    }
}