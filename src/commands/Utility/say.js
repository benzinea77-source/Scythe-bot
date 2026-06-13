import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Make the bot say something')
    .addStringOption(option =>
      option
        .setName('message')
        .setDescription('What should the bot say?')
        .setRequired(true)
    )
    .addChannelOption(option =>
      option
        .setName('channel')
        .setDescription('Channel to send the message in (defaults to current)')
        .setRequired(false)
    ),

  category: 'utility',

  async execute(interaction, config, client) {
    const text = interaction.options.getString('message');
    const channel = interaction.options.getChannel('channel') ?? interaction.channel;

    await channel.send(text);

    await interaction.reply({
      content: `✅ Message sent in ${channel}`,
      ephemeral: true  // Only you see this confirmation
    });
  }
};
