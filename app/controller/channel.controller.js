var Channel = require('mongoose').model('channel');

exports.createChannel = (req, res) => {
    if(req.method == 'POST') {
        var channel = new Channel(req.body)
        Channel.find({channel_name: req.body.channel_name}).then((data) => {
            if(data.length) {
                res.status(200).json(res.responseHandler('Channel already exists!'))
            } else {
                channel.save((err) => {
                    if(err) {
                        res.status(200).json(res.responseHandler('Channel couldn\'t be created'))
                    } else {
                        res.status(200).json(res.responseHandler(channel, 'Channel created successfully!', 200))
                    }
                })
            }
        })
    }   
}