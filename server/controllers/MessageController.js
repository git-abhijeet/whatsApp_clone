import getPrismaInstance from "../utils/PrismaClient.js";

export const addMessage = async (req, res, next) => {
    try {
        const prisma = getPrismaInstance();
        let { message, from, to } = req.body;
        const getUser = onlineUsers.get(to);
        if (message && from && to) {
            const newMessage = await prisma.messages.create({
                data: {
                    message,
                    sender: { connect: { id: from.toString() } },
                    receiver: { connect: { id: to.toString() } },
                    messageStatus: getUser ? "delivered" : "sent",
                },
                include: { sender: true, receiver: true },
            });
            return res.status(201).send({ message: newMessage });
        }
        return res.status(400).send("From, to and Message is required.");
    } catch (error) {
        next(error);
    }
}

export const getMessage = async (req, res, next) => {
    try {
        const prisma = getPrismaInstance();
        const { from, to } = req.params;

        const messages = await prisma.messages.findMany({
            where: {
                OR: [
                    {
                        senderId: from.toString(),
                        receiverId: to.toString()
                    },
                    {
                        senderId: to.toString(),
                        receiverId: from.toString()
                    },
                ],
            },
            orderBy: {
                id: "asc",
            },
        });

        const unreadMessages = [];

        messages.forEach((message, index) => {
            if (message.messageStatus !== "read" && message.senderId === to.toString()) {
                messages[index].messageStatus = "read";
                unreadMessages.push(message.id);
            }
        });

        await prisma.messages.updateMany({
            where: {
                id: { in: unreadMessages },
            },
            data: {
                messageStatus: "read",
            },
        });

        res.status(200).json({ messages });
    } catch (error) {
        next(error);
    }
}